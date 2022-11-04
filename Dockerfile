FROM python:3.9.1
# 设置环境变量
ENV PATH /usr/local/bin:$PATH

# 自定义工作目录
ADD . /reverse_practice
WORKDIR /reverse_practice

# 将本地代码放拷贝到虚拟容器中
COPY requirements.txt /reverse_practice
COPY package.json /reverse_practice

# 下载py和nodejs需要的模块
RUN pip install -r requirements.txt && \
    apt-get update -y && \
    apt-get install nodejs npm -y && \
    npm install
