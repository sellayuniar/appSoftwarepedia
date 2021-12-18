<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");
// session_start();
include("koneksi.php");

$username = $_POST['username'];
$password = $_POST['password'];

// menyeleksi data admin dengan username dan password yang sesuai
$qry = mysqli_query($koneksi, "select * from user where username='$username' and password='$password'");


$banyak = mysqli_num_rows ($qry);
$output = array();
if ($banyak >=1) {
    while($data = mysqli_fetch_object($qry)) {
        $output[]=$data;
    }
    $output['pesan'] = "berhasil masuk!";
}
else {
    $output['error'] =true;
    $output['pesan'] = "gagal masuk!";
}
echo json_encode($output, JSON_PRETTY_PRINT);

