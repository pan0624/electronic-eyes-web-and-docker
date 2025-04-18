document.addEventListener('DOMContentLoaded', function() {
    const chargersList = document.getElementById('chargersList');
    const buttons = document.querySelectorAll('.location-btn');
    let selectedButtonIndex = null;

    // 模拟runScript函数
    function runScript(deviceId) {
        // 模拟API请求
        fetch(`https://api.power.powerliber.com/client/1/device/port-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `token=aaa&client_id=1&app_id=dd&device_id=${deviceId}`
        })
            .then(response => response.json())
            .then(data => {
                const chargers = data.data.list.map((item, idx) => {
                    const id = item.id;
                    const charge_status = item.charge_status;
                    const power = item.power;
                    const time_consumed = item.time_consumed;

                    const current_id = id - data.data.list[0].id + 1;

                    if (charge_status === 0) {
                        return {
                            id: current_id,
                        };
                    }
                    return undefined;
                });

                // 检查是否有空桩
                const allChargersEmpty = chargers.every(charger => charger === undefined);
                if (allChargersEmpty) {
                    chargers.push({ id: '无可用充电桩' });
                }

                // 更新页面
                updateChargersList(chargers);
            })
            .catch(error => {
                console.error('请求失败:', error);
            });
    }

    // 更新充电桩列表
    function updateChargersList(chargers) {
        chargersList.innerHTML = '';
        chargers.forEach(item => {
            if (item) {
                const cell = document.createElement('div');
                cell.className = 'weui-cell';
                cell.innerHTML = `<div class="charger-id">${item.id}</div>`;
                chargersList.appendChild(cell);
            }
        });
    }

    // 按钮点击事件
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            selectedButtonIndex = index;

            // 更新按钮样式
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 调用对应的runScript函数
            switch(index) {
                case 1:
                    runScript("242043");
                    break;
                case 2:
                    runScript("268217");
                    break;
                case 3:
                    runScript("409084");
                    break;
                case 4:
                    runScript("409082");
                    break;
                case 5:
                    runScript("409081");
                    break;
                case 6:
                    runScript("240733");
                    break;
                case 7:
                    runScript("240734");
                    break;
                case 8:
                    runScript("228179");
                    break;
                case 9:
                    runScript("228086");
                    break;
            }
        });
    });
});