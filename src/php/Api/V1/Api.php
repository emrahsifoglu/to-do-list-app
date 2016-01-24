<?php

namespace ToDoListApp\Api\V1;

use PDO;
use PDOException;

class Api {

    private $slim;

    public function __construct(\Slim\Slim $slim) {
        $this->slim = $slim;
        $this->addRoutes();
    }

    public function run(){
        $this->slim->run();
    }

    private function getConnection() {
        $dbhost="127.0.0.1";
        $dbuser="root";
        $dbpass="";
        $dbname="to_do_list_app_db";
        $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

    private function addRoutes() {
        $request = $this->slim->request();
        $text = json_decode($request->getBody());

        $this->slim->get('/todo/:id', function ($id) {
            echo $this->fetchById($id);
        });

        $this->slim->get('/todo', function () {
            echo $this->fetchAll();
        });

        $this->slim->post('/todo', function () use ($text) {
            echo $this->create($text);
        });

        $this->slim->put('/todo/:id', function ($id) use ($text) {
            echo $this->updateById($id, $text);
        });

        $this->slim->delete('/todo/:id', function ($id) {
            echo $this->deleteById($id);
        });
    }

    private function fetchById($id) {
        $sql = "SELECT * FROM to_do WHERE id=:id";
        try {
            $db = $this->getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            $result = [];
            if ($stmt->rowCount() == 1 ) {
                $result[] = $stmt->fetch(PDO::FETCH_ASSOC);
            }
            return json_encode($result);
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    private function fetchAll() {
        $sql = "SELECT * FROM to_do";
        try {
            $db = $this->getConnection();
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $db = null;
            return json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    private function create($text) {
        $sql = "INSERT INTO to_do (text) VALUES (:text)";
        try {
            $db = $this->getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("text", $text);
            $stmt->execute();
            $id = $db->lastInsertId();
            $db = null;
            return json_encode([
                'id' => $id
            ]);
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    private function updateById($id, $text) {
        $sql = "UPDATE to_do SET text=:text WHERE id=:id";
        try {
            $db = $this->getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->bindParam("text", $text);
            $stmt->execute();
            $db = null;
            return json_encode([
                'success' => ($stmt->rowCount() == 1)
            ]);
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

    private function deleteById($id) {
        $sql = "DELETE FROM to_do WHERE id=:id";
        try {
            $db = $this->getConnection();
            $stmt = $db->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $db = null;
            return json_encode([
                'success' => ($stmt->rowCount() == 1)
            ]);
        } catch(PDOException $e) {
            return '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }

}

