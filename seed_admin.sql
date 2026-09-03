INSERT INTO users (id, name, username, email, password, avatar, role, created_at, updated_at) VALUES 
(1, 'Administrator', 'admin', 'admin@gameportal.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'https://api.dicebear.com/7.x/bottts/svg?seed=admin', 'admin', NOW(), NOW())
ON DUPLICATE KEY UPDATE password=VALUES(password), role=VALUES(role);
