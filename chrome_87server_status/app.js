/*
 * @Author: zheng_j
 * @Date:   2016-10-11 14:46:10
 */
(function(w) {
	var xmlhttp, _URL = 'http://hfdoc.qa.nt.ctripcorp.com:9615';
	if (w.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp != null) {
		xmlhttp.onreadystatechange = state_Change;
		xmlhttp.open("GET", _URL, true);
		xmlhttp.send(null);
	} else {
		alert("Your browser does not support XMLHTTP.");
	}

	function fuckData(data) {
		var hostname = data.system_info['hostname'],
			uptime = data.system_info['uptime'],
			total_mem = data.monit['total_mem'],
			free_mem = data.monit['free_mem'],
			memPst = Math.floor((total_mem - free_mem) * 100 / total_mem),
			processes = data.processes,
			_str = '',
			_processesStr = '';
		_sysStr = '<div class="data-box"><table class="sysTable"><tr><td colspan="4">';
		_sysStr += '<center><b>' + hostname + '</b></center></td></tr>';
		_sysStr += ' <tr><th>系统运行时间（小时）</th><td>' + Math.floor(uptime / 3600) + '</td>';
		_sysStr += '<th>内存(M)</th><td><input type="range" name="points" style="width:100px; vertical-align: middle;" min="0" max="100" step="1" value="' + memPst + '" readonly />&nbsp;<span style=" vertical-align: middle;">' + memPst + '已用' + Math.floor((total_mem - free_mem) / 1024 / 1024) + ' ,' + Math.floor(total_mem / 1024 / 1024) + '  空闲</span></td></tr>';
		_sysStr += '</table></div>';
		for (var k in processes) {
			var item_processes = processes[k];
			var name = item_processes['name'],
				pid = item_processes['pid'],
				NODE_ENV = item_processes.pm2_env['NODE_ENV'],
				status = item_processes.pm2_env['status'],
				restart_time = item_processes.pm2_env['restart_time'],
				created_at = new Date(item_processes.pm2_env['created_at']).toLocaleString(),
				pm_uptime = new Date(item_processes.pm2_env['pm_uptime']).toLocaleString(),
				memory = Math.floor(item_processes.monit['memory'] / 1024 / 1024),
				cpu = item_processes.monit['cpu'],
				pm_exec_path = item_processes.pm2_env['pm_exec_path'],
				pm_out_log_path = item_processes.pm2_env['pm_out_log_path'],
				pm_err_log_path = item_processes.pm2_env['pm_err_log_path'],
				pm_pid_path = item_processes.pm2_env['pm_pid_path'];
			_processesStr += '<div class="data-box"><table class ="processesTable">';
			_processesStr += '<tr><th>APP</th><td><b>' + name + '</b></td>';
			_processesStr += '<th>pid</th><td>' + pid + '</td></tr><tr>';
			_processesStr += '<th>内存(M)&CPU(%)</th><td>' + memory + ' , ' + cpu + '%</td>';
			_processesStr += '<th>NODE_ENV</th><td>' + NODE_ENV + '</td></tr>';
			_processesStr += '<tr><th>status</th><td><b>' + status + '</b></td>';
			_processesStr += '<th>created_at</th><td>' + created_at + '</td></tr><tr>';
			_processesStr += '<th>pm_uptime</th><td>' + pm_uptime + '</td>';
			_processesStr += '<th>restart_time</th><td>' + restart_time + '</td></tr>';
			_processesStr += '<tr><th>pm_exec_path</th><td colspan="7">' + pm_exec_path + '</td></tr>';
			_processesStr += '<tr><th>pm_out_log_path</th><td colspan="7">' + pm_out_log_path + '</td></tr>';
			_processesStr += '<tr><th>pm_err_log_path</th><td colspan="7">' + pm_err_log_path + '</td></tr>';
			_processesStr += '<tr><th>pm_pid_path</th><td colspan="7">' + pm_pid_path + '</td></tr>';
			_processesStr += '</table></div>'
		}
		_str = _sysStr + _processesStr;
		var _dom = document.createElement("div");
		_dom.className = 'mainBox';
		_dom.innerHTML = _str;
		var content = w.document.getElementById('content');
		content.innerHTML='';
		content.appendChild(_dom);
	}

	function state_Change() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var response_json = JSON.parse(xmlhttp.responseText);
				console.log(xmlhttp.status);
				console.log(xmlhttp.statusText);
				fuckData(response_json);
			} else {
				alert("Problem retrieving XML data:" + xmlhttp.statusText);
			}
		}
	}
})(window)
