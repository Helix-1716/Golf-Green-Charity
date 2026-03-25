import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role key to bypass RLS in the webhook
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === "checkout.session.completed") {
    const userId = session.metadata.userId;
    const subscriptionId = session.subscription;
    
    // Get full subscription details to find the price/tier
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const planId = subscription.items.data[0].price.id;

    // Update user profile in Supabase
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        subscription_status: "active",
        stripe_customer_id: session.customer,
        stripe_subscription_id: subscriptionId,
        subscription_tier: planId, // or map to 'Premium', 'Elite', etc.
      })
      .eq("id", userId);

    if (error) {
      console.error("Supabase update error:", error);
      return new NextResponse("Database Update Failed", { status: 500 });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    // Handle cancellation
    const subscription = session;
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ subscription_status: "canceled" })
      .eq("stripe_subscription_id", subscription.id);
      
    if (error) console.error("Cancel update error:", error);
  }

  return new NextResponse(null, { status: 200 });
}
