import PrivacyPolicy from '@/components/policies/PrivacyPolicy'
import RefundPolicy from '@/components/policies/RefundPolicy'
import ShippingPolicy from '@/components/policies/ShippingPolicy'
import Terms from '@/components/policies/Terms'
import React from 'react'

const Policies = () => {
  return (
    <div className="p-6 rounded-lg">
      <ul className="space-y-4">
        <li>
          <details className="bg-primary-foreground rounded-lg p-4 shadow">
            <summary className="text-lg font-semibold cursor-pointer hover:text-pink-600">
              Privecy Policy
            </summary>
            <PrivacyPolicy />
          </details>
        </li>
        <li>
          <details className="bg-primary-foreground rounded-lg p-4 shadow">
            <summary className="text-lg font-semibold cursor-pointer hover:text-pink-600">
              Terms and Conditions
            </summary>
            <Terms />
          </details>
        </li>
        <li>
          <details className="bg-primary-foreground rounded-lg p-4 shadow">
            <summary className="text-lg font-semibold cursor-pointer hover:text-pink-600">
            Cancellation & Refund Policy
            </summary>
            <RefundPolicy />
          </details>
        </li>
        <li>
          <details className="bg-primary-foreground rounded-lg p-4 shadow">
            <summary className="text-lg font-semibold cursor-pointer hover:text-pink-600">
              Shipping Policy
            </summary>
            <ShippingPolicy />
          </details>
        </li>
      </ul>
    </div>
  )
}

export default Policies