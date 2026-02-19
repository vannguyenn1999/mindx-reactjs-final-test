import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
function App() {
  return (
    <Footer container className="bg-blue-600 text-white py-6 rounded-none">
      <FooterCopyright href="#" by="Flowbite™" year={2022} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
        <FooterLink href="#" className="text-lg hover:text-yellow-300">
          About
        </FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}

export default App;
