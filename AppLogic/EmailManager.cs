using Azure.Communication.Email;

namespace AppLogic
{
    public class EmailManager
    {
        public async Task<string> SendEmail(string correo, string cuerpo, string asunto)
        {
            string connectionString = "endpoint=https://proyecto2.unitedstates.communication.azure.com/;accesskey=4t1vLld4TNwAx9GVRYDt0wzIVcIjQMi28SmRsm2JzH8Wrp48aME8JQQJ99AGACULyCpOdEt2AAAAAZCSmCYQ";

            EmailClient emailClient = new EmailClient(connectionString);


            EmailContent emailContent = new EmailContent(asunto); // Use the provided 'asunto' parameter
            emailContent.Html = cuerpo; //

            List<EmailAddress> emailAddresses = new List<EmailAddress> { new EmailAddress(correo) };
            EmailRecipients emailRecipients = new EmailRecipients(emailAddresses);
            EmailMessage emailMessage = new EmailMessage("donotreply@6097b9b4-9d52-4fa7-a44f-84781691a94d.azurecomm.net", emailRecipients, emailContent);
            EmailSendOperation emailSendOperation = await emailClient.SendAsync(
            Azure.WaitUntil.Completed,
                emailMessage, CancellationToken.None);

            EmailSendResult statusMonitor = emailSendOperation.Value;

            Console.WriteLine($"Email sent with status {emailSendOperation.Value.Status}");

            return emailSendOperation.Value.Status.ToString();

        }
    }
}
