<template>
    <div class="index-container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <ul class="index-nav">
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='all'}" href="/?tab=all">
                            全部
                        </a>
                    </li>
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='technology'}" href="/?tab=inquire">
                            打听
                        </a>
                    </li>
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='entertainment'}" href="/?tab=used">
                            二手
                        </a>
                    </li>
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='life'}" href="/?tab=part_time_job">
                            兼职
                        </a>
                    </li>
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='interest'}" href="/?tab=gossip">
                            瓜田
                        </a>
                    </li>
                </ul>
            </div>
            <div class="panel-body">
                <p class="bg-info">{{ topic_status }}</p>
                <div class="media topic-border-style" v-for="item in topic" v-if="item.visible">
                    <div class="media-left">
                        <a :href="'/user/' + item.author_id.userName">
                            <img class="img-size media-object" :src="item.author_id.gravatar" alt="...">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">
                            <a class="break-word" :href="'/topic/' + item._id">{{ item.title }}</a>
                        </h4>
                        <p>{{ item.content }}</p>
                        <button @click="deleteTopic(item._id)" class="btn btn-primary delete-btn" v-if="isAdmin || selfUserName == item.author_id.userName">删除贴子</button>
                    </div>
                </div>
            </div>
            <div class="panel-footer footer">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li v-if="page > 1">
                            <a :href="'?tab='+tab+'&page='+(page - 1)">
                                <span>&laquo;</span>
                            </a>
                        </li>
                        <li v-for="item in pageselect">
                            <a :class="{tab: page == item}" :href="'?tab='+tab+'&page='+item">
                                {{ item }}
                            </a>
                        </li>
                        <li v-if="page < pages">
                            <a :href="'?tab='+tab+'&page='+(page + 1)">
                                <span>&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    import computedTime from '../assets/computedTime';
    import computedQuery from '../assets/computedQuery';
    import config from '../../config/config';
    import 'whatwg-fetch';
    export default {
        data () {
            return {
                selfUserName: '',
                isAdmin: false,
                topic: '',
                pages: '',
                page: '',
                pageselect: '',
                tab: '',
                topic_status: ''
            }
        },
        methods: {
            deleteTopic (topicId) {
                console.log("删除id", topicId);
                let data = {
                    _id: topicId
                };
                fetch(`${config.server}/topicdelete?_id=${topicId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.token
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    if(res.ok){
                        return res.json();
                    }
                }).then(json => {
                    if (!json.errorcode) {
                        this.userinfostatus = json.msg;
                    } else if (json.errorcode == 333) {
                        localStorage.token = '';
                        location.href = '/user/signin'
                    } else {
                        this.userinfostatus = json.msg;
                    }
                });
            },
            userInfo () {
                console.log("进入userInfo方法");
                if(!localStorage.token){
                    // location.href = '/';
                    return 0;
                }
                fetch(`${config.server}/user/setting`, {
                    method: 'GET',
                    headers: {
                        'x-access-token': localStorage.token
                    }
                }).then(res => {
                    if(res.ok){
                        return res.json();
                    }
                }).then(json => {
                    if (!json.errorcode) {
                        this.selfUserName = json.user.userName;
                        this.isAdmin = json.user.admin;
                        console.log("isadmin", this.isAdmin);
                    } else if (json.errorcode == 333) {
                        localStorage.token = '';
                        location.href = '/user/signin';
                    } else {
                        this.userinfostatus = json.msg;
                    }
                });
            },
            signout () {
                localStorage.token = '';
                location.href="/";
            },
            pagination () {
                this.pageselect = [this.page - 2, this.page - 1, this.page, 
                this.page + 1, this.page + 2];

                this.pageselect = this.pageselect.filter(item => {
                    return (item >= 1 && item <= this.pages);
                });
            }
        },
        created () {
            let query = computedQuery(location.search);
            this.tab = query.tab || 'all';
            this.page = parseInt(query.page) || 1;

            fetch(`${config.server}/topiccount/?tab=${this.tab}`)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            }).then(json => {
                if (!json.errorcode){
                    this.pages = Math.ceil(json.count / 5);
                    this.pagination();
                } else {
                    this.topic_status = json.msg;
                }
            });

            fetch(`${config.server}/topics${location.search}`)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            }).then(json => {
                if (!json.errorcode) {
                    this.topic = json.topic;
                } else {
                    this.topic_status = json.msg;
                }
            });

            console.log("即将请求用户信息");
            this.userInfo()
        }
    }
</script>

<style scoped>
    .delete-btn {
        float: right;
        display: block;
        margin-right: 20px;
        position: relative;
        top: -20px;
    }
    .index-nav {
        text-align: center;
    }
    .index-nav-item {
        display: inline-block;
        margin: 5px 0;
    }
    .index-nav-item a {
        padding: 5px 10px;
    }
    .tab {
        background: #001529;
        border-radius: 4px;
        color: white;
    }
    .footer {
        text-align: center;
    }
    .img-size {
        width: 64px;
        height: 64px;
    }
    .topic-border-style {
        border: 2px solid #e7e7e7;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
    }
</style>