import { NextResponse } from 'next/server'
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

//let’s add a utility function to format the amount for Stripe
const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100)
}

// Add the following GET function
/*
    1. It extracts the `session_id` from the query parameters of the request.
    2. If no `session_id` is provided, it throws an error.
    3. It uses the Stripe API to retrieve the checkout session details.
    4. It returns the session details as a JSON response.
    5. If an error occurs, it returns a 500 status code with the error message.
*/
export async function GET(req){
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
    return NextResponse.json(checkoutSession)
  }
  catch(error){
    console.error("Error retrieving checkout session:", error)
    return NextResponse.json({error: {message:error.message}}, {status: 500})
  }
}

export async function POST(req) {
  try {
    // We'll implement the checkout session creation here
    // We define the `params` object, which includes all 
    //the necessary information for creating a Stripe checkout session:
    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Pro Subscription',
              },
              //update the `unit_amount` in the `params` object to use this function
              unit_amount: formatAmountForStripe(10), // $10.00 in cents
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      }
      
      const checkoutSession = await stripe.checkout.sessions.create(params)
      
      return NextResponse.json(checkoutSession, {
        status: 200,
      })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}
