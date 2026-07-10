const Footer = () => {
  return (
    <footer className="bg-green-700 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold">
              Grocery Store
            </h2>

            <p className="mt-4 text-green-100">
              Fresh groceries delivered to your
              doorstep with quality and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>Home</li>
              <li>Products</li>
              <li>Cart</li>
              <li>Orders</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <p>Email: support@grocerystore.com</p>
            <p>Phone: +92 300 1234567</p>
            <p>Lahore, Pakistan</p>
          </div>

        </div>

        <hr className="my-8 border-green-500" />

        <p className="text-center text-green-100">
          © 2026 Grocery Store. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;