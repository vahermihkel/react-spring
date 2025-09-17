
function Payment(params: {sum: number}) {

  const pay = () => {
    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const payload = {
      "account_name": "EUR3D1",
      "nonce": "dasd" + new Date() + Math.random() * 9999999,
      "timestamp": new Date(),
      "amount": params.sum,
      "order_reference": Math.random() * 9999999,
      "customer_url": "https://front-05-25.web.app",
      "api_username": "92ddcfab96e34a5f"
    };

    fetch(url, {
      method: "POST", 
      body: JSON.stringify(payload), 
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          alert(json.error.message);
        } else {
          console.log(JSON.stringify(json));
          // window.location.href = json.payment_link;
        }
      })
  }

  // URLi vahetamiseks:
  // <Link to="/admin">     Reacti siseselt ilma refreshita, HTML-s
  // <a href="">            välisele lingile, HTML-s
  // window.location.href   välisele lingile, JavaScriptis
  // useNavigate()   navigate("/admin")   Reacti siseselt, JavaScriptis

  return (
    <div>
      <button onClick={pay}>Maksa</button>
    </div>
  )
}

export default Payment