using System.Security.Cryptography;
using System.Text;

namespace DataAccess.Mappers
{
    public class EncrypMapper
    {
        private readonly byte[] secretKey;

        public EncrypMapper(string secretKey)
        {
            // Ensure the key is of a valid size (16, 24, or 32 bytes)
            if (secretKey.Length != 16 && secretKey.Length != 24 && secretKey.Length != 32)
            {
                throw new ArgumentException("Secret key must be 16, 24, or 32 bytes long.");
            }
            this.secretKey = Encoding.UTF8.GetBytes(secretKey);
        }

        public string Encrypt(string text)
        {
            if (string.IsNullOrEmpty(text))
                throw new ArgumentException("Input text cannot be null or empty.");

            using var aes = Aes.Create();
            aes.Key = secretKey;
            aes.GenerateIV();

            var encryptor = aes.CreateEncryptor();

            var data = Encoding.UTF8.GetBytes(text);
            var encrypted = encryptor.TransformFinalBlock(data, 0, data.Length);

            var combined = new byte[aes.IV.Length + encrypted.Length];
            Array.Copy(aes.IV, combined, aes.IV.Length);
            Array.Copy(encrypted, 0, combined, aes.IV.Length, encrypted.Length);

            return Convert.ToBase64String(combined);
        }

        public string Decrypt(string ciph)
        {
            if (string.IsNullOrEmpty(ciph))
                throw new ArgumentException("Input ciphertext cannot be null or empty.");

            var combined = Convert.FromBase64String(ciph);

            using var aes = Aes.Create();
            aes.Key = secretKey;
            aes.IV = combined[..aes.IV.Length];

            var decryptor = aes.CreateDecryptor();

            var encrypted = combined[aes.IV.Length..];
            var decrypted = decryptor.TransformFinalBlock(encrypted, 0, encrypted.Length);

            return Encoding.UTF8.GetString(decrypted);
        }
    }
}
