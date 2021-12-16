var $$ = Dom7;
var app = new Framework7({
  // App root element
  el: "#app",
  // App Name
  name: "My App",
  // App id
  view: {
    stackPages: true,
  },
  id: "com.myapp.test",
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  // Add default routes
  routes: [
    {
      path: "/",
      url: "index.html",
    },
    {
      path: "/home/",
      url: "./pages/home.html",
    },
    {
      path: "/android/",
      url: "./pages/android.html",
    },
    {
      path: "/ios/",
      url: "./pages/ios.html",
    },
    {
      path: "/windows/",
      url: "./pages/windows.html",
    },
    {
      path: "/detail-artikel/",
      url: "./pages/detail-artikel.html",
    },
    {
      path: "/profile/",
      url: "./pages/profile.html",
    },
    {
      path: "/kelola-artikel/",
      url: "./pages/kelola-artikel.html",
    },
    {
      path: "/tambah-artikel/",
      url: "./pages/tambah-artikel.html",
    },
    {
      path: "/ubah-artikel/",
      url: "./pages/ubah-artikel.html",
    },
    {
      path: "/login/",
      url: "./pages/login.html",
    },
    {
      path: "/register/",
      url: "./pages/register.html",
    },
  ],
  // ... other parameters
});

//potong string
function truncateString(str, num) {
  // Clear out that junk in your trunk
  var strl = str.length;
  var strs = str.split(" ");
  var acm = [];
  var sisa = eval(num);
  var sssa = "";

  // console.log("num: " + num);
  // console.log("strl: " + strl);
  // console.log("strs: " + strs);
  // console.log("sisa: " + sisa);
  // console.log("sssa: " + sssa);
  if (strl > num) {
    for (var i = 0; i < strs.length; i++) {
      acm[i] = strs[i].length;
      if (sisa == 0) break;
      if (i == 0) {
        if (sisa > acm[i]) {
          sisa -= acm[i];
          sssa += strs[i] + " ";
        } else if (sisa < acm[i]) {
          sisa = 0;
          sssa = strs[i].slice(0, num) + "...";
        }
      } else {
        if (sisa > acm[i]) {
          sisa -= acm[i];
          sssa += strs[i] + " ";
        } else {
          sisa = 0;
          sssa = sssa.trim();
          sssa += "...";
        }
      }
      // console.log("Sisa: " + sisa);
    }
  } else {
    // console.log("Masuk else");
    sssa = str;
  }
  sssa = sssa.trim();
  // console.log("Sisa: " + sssa);
  // console.log("Sisa Length: " + sssa.length);
  return sssa;
}

var mainView = app.views.create(".view-main");
cek();
function cek() {
  var status = localStorage.getItem("status");
  if (status == "login") {
    app.view.main.router.navigate("/home/");
  } else {
    app.view.main.router.navigate("/");
  }
}

$$(".view-main").on("click", "#masuk", function () {
  var username = $$("#username").val();
  var password = $$("#password").val();
  app.request({
    url: "https://ivorydaily.000webhostapp.com/prosesLogin.php",
    type: "POST",
    data: {
      username: username,
      password: password,
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.error) {
        app.dialog.alert(data.pesan);
        app.view.main.router.navigate("/");
      } else {
        localStorage.setItem("status", "login");
        localStorage.setItem("username", data[0].username);
        app.dialog.alert(data.pesan);
        app.view.main.router.navigate("/home/");
        bacaArtikel();
      }
    },
  });
});

$$(document).on("page:init", function (e, page) {
  if (page.name == "register") {
    $$(".view-main").on("click", "#daftar", function () {
      var remail = $$("#remail").val();
      var rusername = $$("#rusername").val();
      var rpassword = $$("#rpassword").val();
      app.request({
        url: "https://ivorydaily.000webhostapp.com/prosesRegister.php",
        type: "POST",
        data: {
          remail: remail,
          rusername: rusername,
          rpassword: rpassword,
        },
        dataType: "json",
        success: function (data) {
          if (data.pesan) {
            app.dialog.alert(data.pesan);
            $$("#remail").val();
            $$("#rusername").val();
            $$("#rpassword").val();
            app.view.main.router.navigate("/");
          }
        },
      });
    });
  }

  if (page.name == "profile") {
    $$(".view-main").on("click", "#kelolaArtikel", function () {
      app.view.main.router.navigate("/kelola-artikel/");
      kelolaArtikel();
    });

    $$(".view-main").on("click", "#keluar", function () {
      localStorage.removeItem("status");
      localStorage.removeItem("username");
      app.view.main.router.navigate("/");
    });
  }

  if (page.name == "home") {
    $$(".view-main").on("click", "#bacaArtikel", function () {
      app.view.main.router.navigate("/home/");
      bacaArtikel();
    });
    $$(".view-main").on("click", "#bacaAndroid", function () {
      app.view.main.router.navigate("/android/");
      bacaAndroid();
    });
    $$(".view-main").on("click", "#bacaIos", function () {
      app.view.main.router.navigate("/ios/");
      bacaIos();
    });
    $$(".view-main").on("click", "#bacaWindows", function () {
      app.view.main.router.navigate("/windows/");
      bacaWindows();
    });
  }

  if (page.name == "tambah-artikel") {
    app.calendar.create({
      inputEl: "#tanggal",
      closeOnSelect: true,
      dateFormat: "yyyy-mm-dd",
    });

    $$(".view-main").on("click", "#simpan", function () {
      // app.dialog.alert("ini di klik loh");
      var judul = $$("#judul").val();
      var penulis = $$("#penulis").val();
      var tanggal = $$("#tanggal").val();
      var kategori = $$("#kategori").val();
      var isi = $$("#isi").val();
      app.request({
        url: "https://ivorydaily.000webhostapp.com/prosesSimpan.php",
        type: "POST",
        data: {
          judul: judul,
          penulis: penulis,
          tanggal: tanggal,
          kategori: kategori,
          isi: isi,
        },
        dataType: "json",
        success: function (data) {
          if (data.pesan) {
            app.dialog.alert(data.pesan);
            $$("#judul").val("");
            $$("#penulis").val("");
            $$("#tanggal").val("");
            $$("#kategori").val("");
            $$("#isi").val("");
            app.view.main.router.navigate("/home/");
            bacaArtikel();
          }
        },
      });
    });
  }

  if (page.name == "ubah-artikel") {
    app.calendar.create({
      inputEl: "#utanggal",
      closeOnSelect: true,
      dateFormat: "yyyy-mm-dd",
    });

    $$(".view-main").on("click", "#btnUbah", function () {
      var id = $$("#uid_artikel").val();
      var judul = $$("#ujudul").val();
      var penulis = $$("#upenulis").val();
      var tanggal = $$("#utanggal").val();
      var kategori = $$("#ukategori").val();
      var isi = $$("#uisi").val();
      app.request({
        url: "https://ivorydaily.000webhostapp.com/prosesUbah.php",
        type: "POST",
        data: {
          id: id,
          judul: judul,
          penulis: penulis,
          tanggal: tanggal,
          kategori: kategori,
          isi: isi,
        },
        dataType: "json",
        success: function (data) {
          if (data.pesan) {
            app.dialog.alert(data.pesan);
            $$("#uid_artikel").val("");
            $$("#ujudul").val("");
            $$("#upenulis").val("");
            $$("#utanggal").val("");
            $$("#uisi").val("");
            app.view.main.router.navigate("/kelola-artikel/");
            kelolaArtikel();
          }
        },
      });
    });
  }
});

//tampil index
bacaArtikel();
function bacaArtikel() {
  app.request.json("https://ivorydaily.000webhostapp.com/tampil.php", function (data) {
    var jmlh = data.length;
    var i = "";
    console.log(data);
    var artikel = "";
    // bacaArtikel();
    for (i = 0; i < jmlh; i++) {
      artikel +=
        '<div class="card demo-card-header-pic"> <div style="background-image: url(img/aplikasi.jpg)" class="card-header align-items-flex-end">' +
        "</div>" +
        '<div class="card-content card-content-padding">' +
        '<h3 class="title">' +
        data[i].judul +
        "</h3>" +
        '<p class="date">' +
        data[i].tanggal +
        " | " +
        data[i].kategori +
        " | " +
        data[i].penulis +
        "</p>" +
        "<p>" +
        truncateString(data[i].isi, 100) +
        '</p> </div> <div class="card-footer"> <a href="" class="link color-blue" id="btnDetailArtikel" data-id="' +
        data[i].id_artikel +
        '">Read more</a></div></div></div>';
    }
    $$("#tampil").html(artikel);
  });
}

bacaAndroid();
function bacaAndroid() {
  app.request.json("https://ivorydaily.000webhostapp.com/tampilAndroid.php", function (data) {
    var jmlh = data.length;
    var i = "";
    console.log(data);
    var artikel = "";
    // bacaAndroid();
    for (i = 0; i < jmlh; i++) {
      artikel +=
        '<div class="card demo-card-header-pic"> <div style="background-image: url(img/aplikasi.jpg)" class="card-header align-items-flex-end">' +
        "</div>" +
        '<div class="card-content card-content-padding">' +
        '<h3 class="title">' +
        data[i].judul +
        "</h3>" +
        '<p class="date">' +
        data[i].tanggal +
        " | " +
        data[i].kategori +
        " | " +
        data[i].penulis +
        "</p>" +
        "<p>" +
        truncateString(data[i].isi, 100) +
        '</p> </div> <div class="card-footer"> <a href="" class="link color-blue" id="btnDetailArtikel" data-id="' +
        data[i].id_artikel +
        '">Read more</a></div></div></div>';
    }
    $$("#tampilAndroid").html(artikel);
  });
}

bacaIos();
function bacaIos() {
  app.request.json("https://ivorydaily.000webhostapp.com/tampilIos.php", function (data) {
    var jmlh = data.length;
    var i = "";
    console.log(data);
    var artikel = "";
    // bacaIos();
    for (i = 0; i < jmlh; i++) {
      artikel +=
        '<div class="card demo-card-header-pic"> <div style="background-image: url(img/aplikasi.jpg)" class="card-header align-items-flex-end">' +
        "</div>" +
        '<div class="card-content card-content-padding">' +
        '<h3 class="title">' +
        data[i].judul +
        "</h3>" +
        '<p class="date">' +
        data[i].tanggal +
        " | " +
        data[i].kategori +
        " | " +
        data[i].penulis +
        "</p>" +
        "<p>" +
        truncateString(data[i].isi, 100) +
        '</p> </div> <div class="card-footer"> <a href="" class="link color-blue" id="btnDetailArtikel" data-id="' +
        data[i].id_artikel +
        '">Read more</a></div></div></div>';
    }
    $$("#tampilIos").html(artikel);
  });
}

bacaWindows();
function bacaWindows() {
  app.request.json("https://ivorydaily.000webhostapp.com/tampilWindows.php", function (data) {
    var jmlh = data.length;
    var i = "";
    console.log(data);
    var artikel = "";
    for (i = 0; i < jmlh; i++) {
      artikel +=
        '<div class="card demo-card-header-pic"> <div style="background-image: url(img/aplikasi.jpg)" class="card-header align-items-flex-end">' +
        "</div>" +
        '<div class="card-content card-content-padding">' +
        '<h3 class="title">' +
        data[i].judul +
        "</h3>" +
        '<p class="date">' +
        data[i].tanggal +
        " | " +
        data[i].kategori +
        " | " +
        data[i].penulis +
        "</p>" +
        "<p>" +
        truncateString(data[i].isi, 100) +
        '</p> </div> <div class="card-footer"> <a href="" class="link color-blue" id="btnDetailArtikel" data-id="' +
        data[i].id_artikel +
        '" >Read more</a></div></div></div>';
    }
    $$("#tampilWindows").html(artikel);
  });
}

kelolaArtikel();
function kelolaArtikel() {
  app.request.json("https://ivorydaily.000webhostapp.com/tampil.php", function (data) {
    var jmlh = data.length;
    var i = "";
    console.log(data);
    var artikel = "";
    // kelolaArtikel();
    for (i = 0; i < jmlh; i++) {
      artikel +=
        '<div class="card demo-card-header-pic"> <div style="background-image: url(img/aplikasi.jpg)" class="card-header align-items-flex-end">' +
        "</div>" +
        '<div class="card-content card-content-padding">' +
        '<h3 class="title">' +
        data[i].judul +
        "</h3>" +
        '<p class="date">' +
        data[i].tanggal +
        " | " +
        data[i].kategori +
        " | " +
        data[i].penulis +
        "</p>" +
        "<p>" +
        truncateString(data[i].isi, 100) +
        '</p> </div> <div class="card-footer"> <a href="" class="link button button-fill color-blue" id="btnDetailArtikel" data-id="' +
        data[i].id_artikel +
        '">Detail</a> <a href="" class="link button button-fill color-green" id="ubah" data-id="' +
        data[i].id_artikel +
        '">Edit</a><a href="" class="link button button-fill color-red" id="hapus" data-id="' +
        data[i].id_artikel +
        '">Delete</a></div></div></div>';
    }
    $$("#kelolaArtikel").html(artikel);
  });
}

$$(".view-main").on("click", "#btnDetailArtikel", function () {
  var id = $$(this).data("id");
  app.view.main.router.navigate("/detail-artikel/");
  app.request.json("https://ivorydaily.000webhostapp.com/cari.php", { id: id }, function (data) {
    console.log(data);
    var artikel = "";
    artikel +=
      '<div class="card demo-card-header-pic"> <div style="background-image: url(img/aplikasi.jpg)" class="card-header align-items-flex-end">' +
      "</div>" +
      '<div class="card-content card-content-padding">' +
      '<h3 class="title">' +
      data[0].judul +
      "</h3>" +
      '<p class="date">' +
      data[0].tanggal +
      " | " +
      data[0].kategori +
      " | " +
      data[0].penulis +
      "</p>" +
      "<p>" +
      data[0].isi +
      "</p> </div></div>";
    $$("#detailArtikel").html(artikel);
  });
});

$$(".view-main").on("click", "#hapus", function () {
  var id = $$(this).data("id");
  app.request.post("https://ivorydaily.000webhostapp.com/hapus.php", { id: id }, function (data) {
    app.dialog.alert("Berhasil Di Hapus");
    kelolaArtikel();
  });
});

$$(".view-main").on("click", "#ubah", function () {
  var id = $$(this).data("id");
  app.view.main.router.navigate("/ubah-artikel/");
  app.request.json(
    "https://ivorydaily.000webhostapp.com/cari.php",
    {
      id: id,
    },
    function (data) {
      $$("#uid_artikel").val(data[0].id_artikel);
      $$("#ujudul").val(data[0].judul);
      $$("#upenulis").val(data[0].penulis);
      $$("#utanggal").val(data[0].tanggal);
      $$("#ukategori").val(data[0].kategori);
      $$("#uisi").val(data[0].isi);
    }
  );
});
