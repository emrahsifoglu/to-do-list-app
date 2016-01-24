<?php

namespace ToDoListApp;

use RuntimeException;

class CustomView extends \Slim\View {

    public function render($template, $data = null) {
        $templatePath = $this->getTemplatesDirectory() . '/' . ltrim($template, '/');
        if ( !file_exists($templatePath) ) {
            throw new RuntimeException('View cannot render template `' . $templatePath . '`. Template does not exist.');
        }
        return parent::render($template, $data);
    }

}
