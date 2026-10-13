# JazzCash Business / Raast QR donations

The supplied YZ Educational Services payment poster is published on both sites at `/images/yz-jazzcash-raast-poster.jpg`. The checkout display uses a crop of its original QR at `/images/yz-jazzcash-raast-qr.png`. The poster identifies the recipient as **Y Z Educational Services Pvt Limited** and shows TILL ID **984649286**. The QR and TILL ID are static: the donor enters the amount in their payment app and verifies the recipient before sending.

The QR is offered as a direct-transfer option on `/donate`, separate from PayPro. PayPro orders are created and verified only in the PayPro flow. A QR scan, WhatsApp message, or screenshot must never mark one of those orders paid. Operations must reconcile the transfer against the JazzCash Business account and confirm the correct amount and designation before issuing a receipt or arranging benefits.

`NEXT_PUBLIC_DONATION_WHATSAPP` can override the existing school contact (digits with country code; default `923008099015`). The account number is deliberately omitted because it is not printed on the supplied poster. If operations later provides a separate verified account number, review it against the merchant record before publishing.

Before production use, have the JazzCash Business account owner scan the published QR in JazzCash and a Raast-compatible bank app, confirm that the displayed recipient and TILL ID match the merchant account, and test a small transfer with settlement reconciliation. Static QR display does not provide a payment status API or automatic receipt.
