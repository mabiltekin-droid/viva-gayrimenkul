async function loadIlan(slug) {
  const res = await fetch(`/content/ilanlar/${slug}.md`);
  const text = await res.text();

  const front = text.match(/---([\s\S]*?)---/)[1];
  const body = text.split('---')[2];

  const data = {};
  front.split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (!key) return;
    data[key.trim()] = rest.join(':').trim().replace(/"/g, '');
  });

  document.title = data.title + " | Viva Gayrimenkul";

  document.getElementById("title").innerText = data.title;
  document.getElementById("price").innerText = data.price;
  document.getElementById("location").innerText = data.location;
  document.getElementById("details").innerHTML = `
    <li>${data.area} m²</li>
    <li>${data.rooms}</li>
    <li>Kat: ${data.floor}</li>
    <li>Bina Yaşı: ${data.age}</li>
  `;
  document.getElementById("content").innerHTML = body;
  document.getElementById("cover").src = data.cover;

  document.getElementById("whatsapp").href =
    `https://wa.me/905XXXXXXXXX?text=${encodeURIComponent(
      data.title + " ilanı hakkında bilgi almak istiyorum."
    )}`;

  if (data.map) document.getElementById("map").innerHTML = data.map;
}
