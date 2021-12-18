<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");
include("koneksi.php");

$judul = $_POST['judul'];
$penulis = $_POST['penulis'];
$tanggal = $_POST['tanggal'];
$kategori = $_POST['kategori'];
$isi = $_POST['isi'];

$sql = "INSERT INTO artikel(judul, penulis, tanggal, kategori, isi) values ('$judul','$penulis', '$tanggal','$kategori', '$isi')";
$query = mysqli_query($koneksi, $sql);
$data = array();
if ($query) {
    $data['pesan'] = "Artikel Berhasil Di Publish";
}  else {
    $data['pesan'] = "Error: ".mysqli_error($koneksi);
}

echo json_encode($data);


?>