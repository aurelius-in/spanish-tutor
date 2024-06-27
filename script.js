function translate() {
    var word = document.getElementById('word').value;

    // PHP code as a string
    var phpCode = `
        $word = '` + word + `';
        $apiUrl = 'https://api.mymemory.translated.net/get?q=' . $word . '&langpair=en|es';
        $response = file_get_contents($apiUrl);
        $data = json_decode($response, true);
        if (isset($data['responseData']['translatedText'])) {
            echo $data['responseData']['translatedText'];
        } else {
            echo 'No translation found';
        }
    `;

    // Transpile PHP code to JavaScript and execute
    var php = new PHP_JS();
    var result = php.create_scope().execute(phpCode);

    // Display the result
    document.getElementById('translation').innerText = result;
}
