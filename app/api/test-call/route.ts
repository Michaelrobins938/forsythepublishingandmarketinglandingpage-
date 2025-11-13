import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, name } = await req.json();

    if (!phone || !name) {
      return NextResponse.json({ 
        success: false, 
        error: "Phone and name are required" 
      }, { status: 400 });
    }

    // Format phone number to E.164 format
    const formatPhoneNumber = (phone: string): string => {
      const digits = phone.replace(/\D/g, '');
      
      if (digits.length === 11 && digits.startsWith('1')) {
        return `+${digits}`;
      }
      
      if (digits.length === 10) {
        return `+1${digits}`;
      }
      
      if (phone.startsWith('+')) {
        return phone;
      }
      
      return `+1${digits}`;
    };

    const formattedPhone = formatPhoneNumber(phone);
    
    console.log('[Test Call]', { 
      name, 
      original: phone, 
      formatted: formattedPhone 
    });

    // Direct Retell AI call
    const retellResponse = await fetch("https://api.retellai.com/v2/create-phone-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_number: process.env.RETELL_FROM_NUMBER,
        to_number: formattedPhone,
        retell_llm_dynamic_variables: {
          lead_name: name,
          industry: "Test Call",
          email: "test@example.com",
          source: "manual-test",
        },
      }),
    });

    const data = await retellResponse.json();
    
    if (!retellResponse.ok) {
      console.error('[Test Call Error]', retellResponse.status, data);
      return NextResponse.json({ 
        success: false, 
        error: `Retell AI error: ${retellResponse.status} - ${data.message || 'Unknown error'}` 
      }, { status: 500 });
    }

    console.log('[Test Call Success]', data);
    
    return NextResponse.json({ 
      success: true, 
      call_id: data.call_id,
      message: `Test call initiated to ${formattedPhone}. Check your phone!`
    });

  } catch (err: any) {
    console.error("Test call error:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}

