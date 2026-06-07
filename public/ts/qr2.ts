declare const QRCodeStyling: new (options: {
  width: number
  height: number
  type?: string
  data: string
}) => {
  append: (element: HTMLElement) => void
}

function generateQR() {
  const text = "http://172.16.0.68:3000/link.html"

  let display = document.querySelector<HTMLDivElement>("#qrcode")!
  display.innerHTML = "";

  const qrCode = new QRCodeStyling({
    width: 250,
    height: 250,
    type: "svg",
    data: text,
  })

  qrCode.append(display)
  console.log("qr")
}
generateQR()