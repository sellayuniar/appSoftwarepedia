<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");
include("koneksi.php");
$id = $_POST['id'];
$judul = $_POST['judul'];
$penulis = $_POST['penulis'];
$tanggal = $_POST['tanggal'];
$kategori = $_POST['kategori'];
$isi = $_POST['isi'];

$ubah = mysqli_query($koneksi, "UPDATE artikel set judul='$judul', penulis='$penulis', tanggal='$tanggal', kategori='$kategori', isi='$isi' where id_artikel = '$id'");

$data = array();
if ($ubah) {
    $data['pesan'] = "Artikel Berhasil Di Ubah";
} else {
    $data['pesan'] = "Error: ".mysqli_error($koneksi);
}

echo json_encode($data);


?>