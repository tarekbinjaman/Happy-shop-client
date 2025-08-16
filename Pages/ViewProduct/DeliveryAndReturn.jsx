import React from "react";

const DeliveryAndReturn = () => {
  return (
    <div className="mt-4">
      <p className="text-center">
        <strong>Note:</strong> Orders placed after 2 PM EST will be processed
        the next business day. Delivery times are estimates and may vary during
        peak seasons.
      </p>
      <div className="flex justify-between">
      <div>
        <h3>Our Hassle-Free Return Policy</h3>
        <ul class="policy-list">
          <li>
            
            <strong>30-Day Return Window:</strong> Items must be returned within
            30 days of delivery
          </li>
          <li>
             <strong>Condition:</strong>
            Items must be unused, in original packaging with tags attached
          </li>
          <li>
             <strong>Return Methods:</strong>
            Free returns via prepaid label or in-store
          </li>
          <li>
            
            <strong>Refund Processing:</strong> 5-10 business days after we
            receive your return
          </li>
          <li>
            <strong>Exchanges:</strong> Free
            size/color exchanges within 14 days
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold">How to Initiate a Return</h3>
        <ol class="policy-list">
          <li>
            <i class="fas fa-arrow-right"></i> Log in to your account
          </li>
          <li>
            <i class="fas fa-arrow-right"></i> Go to "Order History"
          </li>
          <li>
            <i class="fas fa-arrow-right"></i> Select the item(s) to return
          </li>
          <li>
            <i class="fas fa-arrow-right"></i> Print the prepaid return label
          </li>
          <li>
            <i class="fas fa-arrow-right"></i> Pack and ship your return
          </li>
        </ol>
      </div>
      </div>
    </div>
  );
};

export default DeliveryAndReturn;
