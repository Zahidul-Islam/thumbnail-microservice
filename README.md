# Thumbnail Microservice

Capture high quality website screenshots using Thumbnail Microservice API

[![screenshot](https://raw.githubusercontent.com/zahidul-islam/thumbnail-microservice/master/images/amazon.png)]()

### Getting Started


### Installation

To use **Thumbnail Microservice API** clone the GitHub repository.

```
git clone https://github.com/Zahidul-Islam/thumbnail-microservice.git
cd thumbnail-microservice.git
npm install
```

### Update environment variables

Rename ```.env.template``` file to ```.env``` using ```mv .env.template .env```

Update properties in **.env** file

```
PORT=8000
AWS_REGION=<YOUR_AWS_REGION>
AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
S3_BUCKET_NAME=<YOUR_S3_BUCKET_NAME>
```

Run ```npm run dev```

Thumbnail Microservice API is running on [www.localhost:8000](www.localhost:8000)

### API documentation

#### Making an API request

The url format for making a REST api request to Thumbnail Microservice is:

```
http://<thumbnail-micorservice-api>/api/v1/thumbnails/?REQUEST_OPTIONS
```

Where:

```REQUEST_OPTIONS``` should be replaced by a query string that contains all of the options you want to set. 

#### Request Options

Below is a table listing all of the available options to the API.
Combine these options as parameters in the query string for e.g. ```?url=google.com&size=window```

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Example Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>size</th>
      <td>
        <pre>window/all</pre>
      </td>
    </tr>
    <tr>
      <th>viewport</th>
      <td>
        <pre>width x height (1024x768)
        </pre>
      </td>
    </tr>
    <tr>
      <th>quality</th>
      <td>75</td>
    </tr>
    <tr>
      <th>renderDelay</th>
      <td>0</td>
    </tr>
    <tr>
      <th>timeout</th>
      <td>0</td>
    </tr>
  </tbody>
</table>

The full HTTP url could be:

http://localhost:8000/api/v1/thumbnails/?url=google.com&size=window&viewport=600x800&quality=90&renderDelay=2000&timeout=4000


### License

Copyright (c) 2017, Zahidul Islam. (MIT License)

See LICENSE for more info.
