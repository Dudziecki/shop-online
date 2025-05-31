import styles from "./HelpPage.module.css"

export const HelpPage = () => {
  return (
    <section className={styles.help}>
      <p># Help

        Welcome to our online store! Here you can find answers to frequently asked questions and guidance on how to use our platform.

        ### 🛒 How to Place an Order
        1. Browse our catalog and select the products you like.
        2. Click "Add to Cart".
        3. Go to the cart and click "Checkout".
        4. Fill in your delivery details and confirm the order.

        ### 🔐 How to Create an Account
        - Click "Register" at the top right of the page.
        - Fill in your name, email, and password.
        - After registration, you can log in and view your order history.

        ### ❓ Forgot Your Password?
        - Go to the login page and click "Forgot password".
        - Follow the instructions to reset your password.

        ### 📦 Where Is My Order?
        - Log in to your account.
        - Go to "My Orders" to see the status of your order.

        ### 📧 Need Help?
        If you didn’t find the answer to your question, feel free to contact us:
        - Email: support@example.com
        - Phone: +1 (800) 123-4567
        - Working hours: Mon–Fri, 9 AM – 6 PM (UTC)

        Thank you for shopping with us!
      </p>
    </section>
  )
}

