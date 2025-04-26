// 获取DOM元素
const textInput = document.getElementById('textInput');
const fontSize = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const textColor = document.getElementById('textColor');
const colorPresets = document.querySelectorAll('.color-preset');
const generateBtn = document.getElementById('generateBtn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 更新字体大小显示
fontSize.addEventListener('input', () => {
    fontSizeValue.textContent = `${fontSize.value}px`;
});

// 背景颜色预设
let currentBgColor = '#FFFFFF';
colorPresets.forEach(preset => {
    preset.addEventListener('click', () => {
        currentBgColor = preset.dataset.color;
        colorPresets.forEach(p => p.style.border = '1px solid #ccc');
        preset.style.border = '2px solid #1a73e8';
    });
});

// 生成图片
generateBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) {
        alert('请输入文字内容');
        return;
    }

    // 设置画布尺寸
    const width = 640;
    const padding = 20;
    const lineHeight = parseInt(fontSize.value) * 1.5;
    
    // 计算文本换行
    ctx.font = `${fontSize.value}px system-ui`;
    const words = text.split('');
    let lines = [];
    let currentLine = '';
    
    for (let word of words) {
        const testLine = currentLine + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > width - padding * 2) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);

    // 设置画布高度
    const height = lines.length * lineHeight + padding * 2;
    canvas.width = width;
    canvas.height = height;

    // 绘制背景
    ctx.fillStyle = currentBgColor;
    ctx.fillRect(0, 0, width, height);

    // 绘制文字
    ctx.fillStyle = textColor.value;
    ctx.font = `${fontSize.value}px system-ui`;
    ctx.textBaseline = 'top';
    
    lines.forEach((line, index) => {
        ctx.fillText(line, padding, padding + index * lineHeight);
    });

    // 下载图片
    const link = document.createElement('a');
    link.download = '金句.png';
    link.href = canvas.toDataURL();
    link.click();
});