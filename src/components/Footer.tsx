import phone_icon from "../assets/icons/phone_icon.svg"
import "./Footer.css"

const Footer = ({viewCart}: PropsType) => {


/*const year: number = new Date().getFullYear()*/

const pageContent = 
  <>{!viewCart&&
<section className="newsletter">
        <h3>10% de descuento</h3>
        <h4>¡Suscribete a la newsletter!*</h4>
        <input type="email" placeholder="introduce tu e-mail"/>
      </section>}
      <section className="contacto">
        <h5>¿Necesitas ayuda?</h5>
        <ul className="contact_ways">
          <li><a href=""><img src={phone_icon} />900 900 90x</a></li>
          <li>|</li>
          <li><a href="">Venta online</a></li>
          <li>|</li>
          <li><a href="">Tiendas y empresa</a></li>
        </ul>
        <p>De luneas a viernes de 9:30 a 22:00</p>
      </section>
  </>


const content = (
  <footer className="footer">
    {pageContent}
  </footer>
)


  return content}


  type PropsType = {
    viewCart: boolean,
  }
export default Footer