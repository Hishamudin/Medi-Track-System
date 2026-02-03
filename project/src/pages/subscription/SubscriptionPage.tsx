import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Check, CreditCard, Shield, Clock } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const plans = [
  {
    name: 'Basic',
    price: '$9.99',
    interval: 'month',
    priceId: 'price_basic_monthly',
    features: [
      'Access to medical records',
      'View appointments',
      'Basic health tracking',
      'Email support'
    ]
  },
  {
    name: 'Premium',
    price: '$19.99',
    interval: 'month',
    priceId: 'price_premium_monthly',
    features: [
      'All Basic features',
      'Priority appointments',
      'Advanced health analytics',
      '24/7 support',
      'Family account linking'
    ]
  }
];

const SubscriptionPage: React.FC = () => {
  const { user, subscription } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data: { sessionId }, error: checkoutError } = await supabase.functions.invoke(
        'create-checkout',
        {
          body: { priceId }
        }
      );

      if (checkoutError) throw checkoutError;

      // Redirect to Stripe Checkout
      window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}`;
    } catch (err) {
      setError('Failed to initiate subscription. Please try again.');
      console.error('Subscription error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="mt-4 text-lg text-gray-500">
          Get access to your complete medical history and records
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-lg shadow-sm divide-y divide-gray-200 bg-white"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-4 text-sm text-gray-500">
                Perfect for {plan.name === 'Basic' ? 'individuals' : 'families'} who need
                {plan.name === 'Basic' ? ' basic' : ' comprehensive'} medical record access
              </p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-base font-medium text-gray-500">/{plan.interval}</span>
              </p>
              <button
                onClick={() => handleSubscribe(plan.priceId)}
                disabled={loading}
                className={`mt-8 block w-full rounded-md border border-transparent px-6 py-3 text-center font-medium text-white ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Processing...' : `Subscribe to ${plan.name}`}
              </button>
            </div>
            <div className="px-6 pt-6 pb-8">
              <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                What's included
              </h4>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-200 pt-10">
        <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
        <div className="mt-6 grid gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-900">How secure is my data?</dt>
            <dd className="mt-2 text-sm text-gray-500">
              Your medical data is encrypted and stored securely following HIPAA guidelines.
              We use industry-standard security measures to protect your information.
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-900">Can I cancel anytime?</dt>
            <dd className="mt-2 text-sm text-gray-500">
              Yes, you can cancel your subscription at any time. You'll continue to have
              access until the end of your billing period.
            </dd>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Shield className="h-6 w-6 text-green-500" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-900">Secure & Encrypted</h4>
            <p className="mt-2 text-sm text-gray-500">
              Your data is protected with enterprise-grade security
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CreditCard className="h-6 w-6 text-green-500" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-900">Easy Payments</h4>
            <p className="mt-2 text-sm text-gray-500">
              Secure payment processing through Stripe
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Clock className="h-6 w-6 text-green-500" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-900">24/7 Access</h4>
            <p className="mt-2 text-sm text-gray-500">
              Access your medical records anytime, anywhere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;