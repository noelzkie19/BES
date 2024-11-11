using System.Net;
using System.Net.Mime;
using System.Text;
using System.Text.RegularExpressions;
using MimeKit;
using MimeKit.Utils;

namespace BES.Domain.Helper.Extensions;

public static class Extensions
{
    public static Tuple<AttachmentCollection, string> ContentAttachmentLink(this string content)
    {
        var imgCount = 0;
        var builder = new BodyBuilder();
        foreach (Match m in Regex.Matches(content, "<img(?<value>.*?)>"))
        {
            imgCount++;
            // var contentId = MimeUtils.GenerateMessageId();
            var imgContent = m.Groups["value"].Value;
            string type = Regex.Match(imgContent, ":(?<type>.*?);base64,").Groups["type"].Value;
            string base64 = Regex.Match(imgContent, "base64,(?<base64>.*?)\"").Groups["base64"].Value;
            if (String.IsNullOrEmpty(type) || String.IsNullOrEmpty(base64))
            {
                //ignore replacement when match normal <img> tag
                continue;
            }
            var replacement = " src=\"cid:" + imgCount + "\" alt=\"no-image\"";
            content = content.Replace(imgContent, replacement);

            var tempResource = new TextPart("image", type)
            {
               ContentId = imgCount.ToString(),
               Content = new MimeContent(new MemoryStream(Encoding.UTF8.GetBytes(base64)), ContentEncoding.Default)
            };
            builder.LinkedResources.Add(tempResource);
        }
        return Tuple.Create(builder.LinkedResources, content);
    }

    public static Tuple<AttachmentCollection, string> ContentAttachmentLinkSignature(this string content)
    {
        var imgCount = 0;
        var builder = new BodyBuilder();
        foreach (Match m in Regex.Matches(content, "<img(?<value>.*?)>"))
        {
            imgCount++;
            var imgTag = m.Value;
            var imgContent = m.Groups["value"].Value;

            var replacement = " <img src=\"cid:" + imgCount + "\" alt=\"no-image\" height\"200px\">";
            content = content.Replace(imgTag, replacement);

            // Extract the 'src' attribute value from the image tag
            var srcMatch = Regex.Match(imgContent, "src=['\"]?(?<src>[^'\"\\s>]+)");
            if (srcMatch.Success)
            {
                var src = srcMatch.Groups["src"].Value;

                // Determine if the image source is a URL or a local file
                if (Uri.TryCreate(src, UriKind.Absolute, out var uri) && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps))
                {
                    // Handle remote URL image
                    using (var client = new WebClient())
                    {
                        var imageBytes = client.DownloadData(src);

                        // Determine the image format (e.g., PNG, JPEG) based on the file extension
                        var fileExtension = Path.GetExtension(src).ToLower();
                        var imageFormat = MimeTypes.GetMimeType(fileExtension);

                        // Create a linked resource from the downloaded image bytes
                        var linkedResource = new MimePart(imageFormat)
                        {
                            Content = new MimeContent(new MemoryStream(imageBytes)),
                            ContentId = imgCount.ToString()
                        };
                        // linkedResource.ContentDisposition.Parameters.Add("height", "200px"); // Set the desired height
                        builder.LinkedResources.Add(linkedResource);
                    }
                }
                else if (File.Exists(src))
                {
                    // Handle local file image
                    var imageBytes = File.ReadAllBytes(src);

                    // Determine the image format (e.g., PNG, JPEG) based on the file extension
                    var fileExtension = Path.GetExtension(src).ToLower();
                    var imageFormat = MimeTypes.GetMimeType(fileExtension);

                    // Create a linked resource from the local image file
                    var linkedResource = new MimePart(imageFormat)
                    {
                        Content = new MimeContent(new MemoryStream(imageBytes)),
                        ContentId = imgCount.ToString()
                    };
                    // linkedResource.ContentDisposition.Parameters.Add("height", "200px"); // Set the desired height
                    builder.LinkedResources.Add(linkedResource);
                }
            }
            else
            {
                // Handle base64-encoded image
                string type = Regex.Match(imgContent, ":(?<type>.*?);base64,").Groups["type"].Value;
                string base64 = Regex.Match(imgContent, "base64,(?<base64>.*?)\"").Groups["base64"].Value;
                if (String.IsNullOrEmpty(type) || String.IsNullOrEmpty(base64))
                {
                    // Ignore replacement when matching a normal <img> tag
                    continue;
                }

                // Convert the base64 string to bytes
                var imageBytes = Convert.FromBase64String(base64);

                // Create a linked resource from the base64-encoded image bytes
                var linkedResource = new MimePart(type)
                {
                    Content = new MimeContent(new MemoryStream(imageBytes)),
                    ContentId = imgCount.ToString()
                };
                // linkedResource.ContentDisposition.Parameters.Add("height", "200px"); // Set the desired height

                builder.LinkedResources.Add(linkedResource);
            }
        }

        return Tuple.Create(builder.LinkedResources, content);
    }


    public static Stream Base64ToImageStream(string base64String)
    {
        byte[] imageBytes = Convert.FromBase64String(base64String);
        MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
        return ms;
    }



}