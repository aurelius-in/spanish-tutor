<?php
if (isset($_GET['word'])) {
    $word = $_GET['word'];
    $apiUrl = 'https://api.mymemory.translated.net/get?q=' . $word . '&langpair=en|es';
    $response = file_get_contents($apiUrl);
    $data = json_decode($response, true);
    if (isset($data['responseData']['translatedText'])) {
        echo $data['responseData']['translatedText'];
    } else {
        echo 'No translation found';
    }
}
?>
