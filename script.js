async function translate() {
    var word = document.getElementById('word').value;

    // Fetch the PHP code from the file
    var phpCode = await fetch('translate.php')
        .then(response => response.text());

    // Transpile PHP code to JavaScript
    phpCode = phpCode.replace('<?php', '').replace('?>', '');
    phpCode = phpCode.replace(/\$word = \$_GET\['word'\];/, `var word = '${word}';`);
    phpCode = phpCode.replace(/file_get_contents\((.+?)\)/g, 'await fetch($1).then(response => response.text())');
    phpCode = phpCode.replace(/json_decode\((.+?)\)/g, 'JSON.parse($1)');
    phpCode = phpCode.replace(/echo/g, 'return');

    // Execute the transpiled code
    var php = new PHP_JS();
    var scope = await php.create_scope();
    var result = await scope.execute(phpCode);

    // Display the result
    document.getElementById('translation').innerText = result;
}
