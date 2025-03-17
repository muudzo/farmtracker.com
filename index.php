<?php
header("Content-Type: application/json");
require_once("db.php");

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null; // Prevent undefined index warning

switch ($method) {
    case "POST":
        handlePostRequest($action); 
        break;
    case "GET":
        handleGetRequest($action);
        break;
    default:
        echo json_encode(["error" => "That doesn't work, my guy."]);
}

function handlePostRequest($action) {
    global $pdo;
    $data = json_decode(file_get_contents("php://input"), true);

    if ($action === "add_animal") {
        $stmt = $pdo->prepare("INSERT INTO animals (name, species, birthdate, breed) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['name'], $data['species'], $data['birthdate'], $data['breed']]);
        echo json_encode(["message" => "Animal added"]);
    } elseif ($action === "add_transaction") {
        $stmt = $pdo->prepare("INSERT INTO financial (transaction, amount) VALUES (?, ?)");
        $stmt->execute([$data['transaction'], $data['amount']]);
        echo json_encode(["message" => "Transaction added successfully"]);
    } elseif ($action === "add_vaccine") {
        $stmt = $pdo->prepare("INSERT INTO vaccines (vaccine, date) VALUES (?, ?)");
        $stmt->execute([$data['vaccine'], $data['date']]);
        echo json_encode(["message" => "Vaccine added successfully"]);
    }
}

function handleGetRequest($action) {
    global $pdo;
    if ($action === "get_animals") {
        $stmt = $pdo->query("SELECT * FROM animals");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($action === "get_transactions") {
        $stmt = $pdo->query("SELECT * FROM financial");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($action === "get_vaccines") {
        $stmt = $pdo->query("SELECT * FROM vaccines");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}
?>
