<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age:604800");
header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: x-requested-with, x-requested-by");
include("koneksi.php");

$id = $_POST['id'];

$sql = "DELETE FROM artikel WHERE id_artikel='$id'";
$query = mysqli_query($koneksi, $sql);
$data = array();
if ($query) {
    $data['pesan'] = "Artikel Berhasil Dihapus";
} 

echo json_encode($data);

?>