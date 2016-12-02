#AWS for Horo
This file describes how different **services in AWS** can be used for Horo. 

1. We should use a combination of **AWS S3** ( for storing all our images / css / js files ) and we should use **AWS CloudFront** to create a
CDN ( Content Delivery Network) which will make sure that the S3 files are delivered in the best way possible. 

**_How it works?_**

When someone accesses a file through your S3 bucket, it acts just like a regular file host. When someone accesses a file through CloudFiles though, it requests the file from your S3 bucket (the origin) and caches it at the CDN server closest to the orignial request for all subsequent requests. 
