<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <a class="navbar-brand" href="/">ANode</a>

  <div class="collapse navbar-collapse">

    <form class="form-inline ">
      <input class="form-control mr-2" type="search" placeholder="请输入关键字">
      <a class="btn btn-outline-light" href="#">搜索</a>
    </form>

    <ul class="navbar-nav ml-auto">
    	{% if ctx.user %}
    	<span class="navbar-text">
		  欢迎回来，
		</span>
    	<li class="nav-item">
            <a class="nav-link" href="/user/{{ ctx.user._id }}">{{ ctx.user.email }}</a>
        </li>
        <li class="nav-item">
    		<a class="nav-link" href="/topic/create">发布话题</a>
    	</li>
        <li class="nav-item">
            <a class="nav-link" href="/setting">设置</a>
        </li>
    	<li class="nav-item">
    		<a class="nav-link" href="/signout">退出</a>
    	</li>
    	{% else %}
    	<li class="nav-item">
    		<a class="nav-link" href="/signin">登录</a>
    	</li>
    	<li class="nav-item">
    		<a class="nav-link" href="/signup">注册</a>
    	</li>
    	{% endif %}
    </ul>
  </div>

</nav>