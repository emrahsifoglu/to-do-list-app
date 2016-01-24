<?php

namespace ToDoListApp;

use Slim\Slim;
use ToDoListApp\Api\V1\Api;

class App {

    public function __construct() {

        $app = new Slim(array(
            'view' => new CustomView()
        ));

        $app->get('/', function () use ($app) {
           $app->render('index.html');
        });

        $api = new Api($app);
        $api->run();

    }

}