import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe("pk_test_51NFesXCc3QXjBpHh8YfDnjP84ZiJaL8hTl1G6PJAYY5wdvOuCYRuKMKlKWhx3KYMyzoGt1FrCmBkv6fEyy313ymK00hf7yGxx7");

// or
// export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

