using System.Security.Cryptography;
using System.Text;


namespace DataAccess.Mappers
{
    public class EncrypMapper
    {
        private static readonly DataProtectionScope scope = DataProtectionScope.CurrentUser;

        public string Encryp(string text)
        {
            if (text == null)
                throw new ArgumentNullException(nameof(text));

            var data = Encoding.Unicode.GetBytes(text);

            byte[] encrypted = ProtectedData.Protect(data, null, scope);

            return Convert.ToBase64String(encrypted);
        }
        public string Decrypt(string ciph)
        {
            if (ciph == null)
                throw new ArgumentNullException(nameof(ciph));

            byte[] data = Convert.FromBase64String(ciph);

            byte[] decryp = ProtectedData.Unprotect(data, null, scope);

            return Encoding.Unicode.GetString(decryp);
        }
    }
}
