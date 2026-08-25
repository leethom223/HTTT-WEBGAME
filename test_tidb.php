<?php
try {
    $caPath = __DIR__ . '/cacert.pem';
    $pdo = new PDO(
        'mysql:host=gateway01.ap-southeast-1.prod.aws.tidbcloud.com;port=4000;dbname=test',
        '33hTiog1d9M9B4g.root',
        'PfQ2Xu9cRxM1aOrE',
        [
            PDO::MYSQL_ATTR_SSL_CA => $caPath,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
    echo "SUCCESS: Connected to TiDB Cloud MySQL 24/7 database successfully!\n";
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
