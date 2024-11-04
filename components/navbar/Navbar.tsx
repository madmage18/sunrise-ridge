import React from "react";
import Container from "../global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Suspense } from "react";
// useSearchParams() must be wrapped in a Suspense boundary or run the risk of a static pages using the navbar not rendering or switching to client side rendering when built/deployed.
function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo />
        {/* Suspense prevents / ensures static pages using the navbar does not de-opt to client-side rendering. */}
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 item-center">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
