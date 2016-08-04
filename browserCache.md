title: 浏览器缓存
speaker: speaker
url: https://github.com/ksky521/nodePPT
transition: move
files: /js/demo.js,/css/demo.css

[slide]

# 浏览器缓存

[slide]

#强缓存
#协商缓存

[slide]

# 共同点 {:&.flexbox.vleft}
### 强缓存和协商缓存共同点是都从客户端缓存里加载资源而不是从服务端加载。
# 不同点 
### 强缓存不发请求到服务器，而协商缓存需要发送请求到服务器。

[slide]
#强缓存
![](https://dn-mdpic.qbox.me/pic/201608/05/DswccfMSSYKwlZi_101893251.png)

[slide]
![](https://dn-mdpic.qbox.me/pic/201608/05/wyayrEyjTEsMNBX_1257087738.png)

[slide]

#是否过期是怎么定义的？

[slide]

#Cache-Control 和 Expries

[slide]
#Expries {:&.flexbox.vleft}
Expires是http1.0提出的一个表示资源过期时间的header，它描述的是一个绝对时间，由服务器返回。
<br/>
浏览器再请求这个资源时，先从缓存中寻找，找到这个资源后，拿出它的Expires跟当前的请求时间比较，如果请求时间在Expires指定的时间之前，就能命中缓存，否则就不行。没有命中的话，浏览器会向服务端请求资源。

[slide]
#Cache-Control {:&.flexbox.vleft}
在http1.1的时候，提出了一个新的header，就是Cache-Control，这是一个相对时间，在配置缓存的时候，以秒为单位，用数值表示，如：Cache-Control:max-age=315360000。
<br/>
浏览器再请求这个资源时，先从缓存中寻找，找到这个资源后，根据它第一次的请求时间和Cache-Control设定的有效期，计算出一个资源过期时间，再拿这个过期时间跟当前的请求时间比较，如果请求时间在过期时间之前，就能命中缓存，否则就不行。同样没有命中的话，浏览器会向服务端请求资源。

[slide]
Expires和Cache-Control可以只启用一个，也可以同时启用，当response header中，Expires和Cache-Control同时存在时，Cache-Control优先级高于Expires：

[slide]
#协商缓存
![](https://dn-mdpic.qbox.me/pic/201608/05/twVbeWWUgETuIpo_350277736.png)

[slide]
![](https://dn-mdpic.qbox.me/pic/201608/05/uVKgqHKNEUUKzwa_592117841.png)

[slide]
【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】来管理


[slide]
#Last-Modified，If-Modified-Since {:&.flexbox.vleft}
浏览器再次跟服务器请求这个资源时，在request的header上加上If-Modified-Since的header，这个header的值就是上一次请求时返回的Last-Modified的值。
<br/>
服务器再次收到资源请求时，根据浏览器传过来If-Modified-Since和资源在服务器上的最后修改时间判断资源是否有变化，如果没有变化则返回304 Not Modified，但是不会返回资源内容；如果有变化，就正常返回资源内容。

[slide]
#ETag、If-None-Match {:&.flexbox.vleft}
ETag是服务器通过文件内容生成的维一值，只有文件发生变动时，这个值才会发生变化。
<br/>
浏览器再次跟服务器请求这个资源时，在request的header上加上If-None-Match的header，这个header的值就是上一次请求时返回的ETag的值。服务器再次收到资源请求时，根据浏览器传过来If-None-Match和然后再根据资源生成一个新的ETag，如果这两个值相同就说明资源没有变化，否则就是有变化；如果没有变化则返回304 Not Modified，但是不会返回资源内容；如果有变化，就正常返回资源内容。


[slide]
*  ##浏览器的刷新行为会影响缓存的策略。使用F5刷新时浏览器会跳过强缓存，检查协商缓存。
*  ##硬性刷新会跳过强缓存和协商缓存,直接从服务器获取。
