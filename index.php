<?php
header("content-type:application/json");
require_once("db.php");

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'];

    switch($method){
        case "POST"
        handlePostRequest($action); 
        break;
        case "GET":
        handleGetRequest($action);
        break;
        default:
        echo json_encode(["error" => "that doesnt work my guy "]);

    }
    function handlePostRequest($action){
        global $pdo;
        $data= json_decode(file_get_contents("php://input"), true);

        if ($action==="add_animal"){
            $stmt= $pdo-> prepare("INSERT INTO animals (name,species,birthdate,breed)value(?,?,?,?)");
            $stmt->execute([$data['name'],$data['species'],$data['birthdate'],$data['breed']]);
            echo json_encode(["message" => "animal added"]);
        }elseif($action==="add_transaction")
    