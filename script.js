$(document).ready(function() {
  const apiKey = "GhdyJnwr41eYRPcvifiCOjsExyemDE61duyiWW8h";

  const today = new Date().toISOString().split('T')[0];
  $("#date-input").attr("max", today);

  function fetchAPOD(date) {
    if(!date) {
      $("#apod-section").html("<p>Silakan pilih tanggal.</p>");
      return;
    }

    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    $.getJSON(url)
      .done(function(data) {
        let media = '';
        if(data.media_type === "image") {
          media = `<img src="${data.url}" alt="${data.title}">`;
        } else if(data.media_type === "video") {
          media = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
        }

        $("#apod-section").html(`
          <h2>${data.title}</h2>
          ${media}
          <p>${data.explanation}</p>
        `);
      })
      .fail(function() {
        $("#apod-section").html("<p>Data tidak tersedia untuk tanggal ini.</p>");
      });
  }

  $("#fetch-btn").click(function() {
    const date = $("#date-input").val();
    fetchAPOD(date);
  });
});
