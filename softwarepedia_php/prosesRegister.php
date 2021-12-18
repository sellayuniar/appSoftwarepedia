<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");
include("koneksi.php");

$email = $_POST['remail'];
$username = $_POST['rusername'];
$password = $_POST['rpassword'];

$sql = "INSERT INTO user(email, username, password) VALUES ('$email', '$username', '$password')";
$query = mysqli_query($koneksi, $sql);
$data = array();
if ($query) {
    $data['pesan'] = "Selamat Anda Berhasil Mendaftar";
} 

echo json_encode($data);

?>