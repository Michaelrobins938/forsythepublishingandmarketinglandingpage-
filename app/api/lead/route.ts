import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, email, industry, company, utm, source, session_id } = await req.json();

    console.log('[Lead Received]', {
      name,
      phone,
      email,
      industry,
      timestamp: new Date().toISOString(),
    });

    // Validate required fields
    if (!phone || !name) {
      return NextResponse.json({ 
        success: false, 
        error: "Phone number and name are required" 
      }, { status: 400 });
    }

    // Format phone number to E.164 format
    const formatPhoneNumber = (phone: string): string => {
      // Remove all non-digit characters
      const digits = phone.replace(/\D/g, '');
      
      // If it's already 11 digits and starts with 1, add +
      if (digits.length === 11 && digits.startsWith('1')) {
        return `+${digits}`;
      }
      
      // If it's 10 digits, assume US number and add +1
      if (digits.length === 10) {
        return `+1${digits}`;
      }
      
      // If it already has +, return as is
      if (phone.startsWith('+')) {
        return phone;
      }
      
      // Default: assume US number and add +1
      return `+1${digits}`;
    };

    const formattedPhone = formatPhoneNumber(phone);
    console.log('[Phone Formatting]', { 
      original: phone, 
      formatted: formattedPhone,
      length: formattedPhone.length,
      startsWithPlus: formattedPhone.startsWith('+'),
      digitsOnly: formattedPhone.replace(/\D/g, ''),
      digitsLength: formattedPhone.replace(/\D/g, '').length
    });

    // Prepare Retell AI payload
    const retellPayload = {
      from_number: process.env.RETELL_FROM_NUMBER,
      to_number: formattedPhone,
      retell_llm_dynamic_variables: {
        lead_name: name,
        industry: industry || company || "General Inquiry",
        email: email || "",
        source: source || "forsythe-landing",
        utm_source: utm?.source || "",
        utm_campaign: utm?.campaign || "",
      },
    };

    console.log('[Retell AI Payload]', retellPayload);

    // Direct Retell AI call
    const retellResponse = await fetch("https://api.retellai.com/v2/create-phone-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(retellPayload),
    });

    const data = await retellResponse.json();
    
    if (!retellResponse.ok) {
      console.error('[Retell AI Error]', {
        status: retellResponse.status,
        statusText: retellResponse.statusText,
        error: data,
        payload: retellPayload
      });
      return NextResponse.json({ 
        success: false, 
        error: `Retell AI error: ${retellResponse.status} - ${data.message || data.error || 'Unknown error'}` 
      }, { status: 500 });
    }

    console.log('[Retell AI Success]', data);
    
    return NextResponse.json({ 
      success: true, 
      retellResponse: data,
      message: "AI agent will call within 2-5 minutes"
    });

  } catch (err: any) {
    console.error("Error triggering Retell AI call:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}




