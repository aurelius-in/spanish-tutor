async function translate() {
    var word = document.getElementById('word').value;

    // Fetch the PHP code from the file
    var phpCode = await fetch('translate.php')
        .then(response => response.text());

    // Replace the placeholder with the actual word
    phpCode = phpCode.replace('<?php', '').replace('?>', '');
    phpCode = phpCode.replace(/\$word = \$_GET\['word'\];/, `var word = '${word}';`);
    phpCode = phpCode.replace(/file_get_contents\((.+?)\)/g, 'await fetch($1).then(response => response.text())');
    phpCode = phpCode.replace(/json_decode\((.+?)\)/g, 'JSON.parse($1)');
    phpCode = phpCode.replace(/echo/g, 'return');

    // Transpile PHP code to JavaScript and execute
    var php = new PHP_JS().create_scope();
    var result = await php.execute(phpCode);

    // Display the result
    document.getElementById('translation').innerText = result;
}
