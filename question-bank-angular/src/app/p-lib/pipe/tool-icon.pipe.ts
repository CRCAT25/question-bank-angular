import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toolIcon'
})
export class ToolIconPipe implements PipeTransform {

  transform(tool: string): string {
    switch (tool) {
      case 'Xem chi tiết':
        return 'iconEye.svg';
      case 'Chỉnh sửa':
        return 'iconPencil.svg';
      case 'Gửi duyệt':
        return 'iconSend.svg';
      case 'Phê duyệt':
        return 'iconTick.svg';
      case 'Ngưng hiển thị':
        return 'iconBan.svg';
      case 'Trả về':
        return 'iconReturn.svg';
      case 'Xóa câu hỏi':
        return 'iconTrash.svg';
      default:
        return 'iconEye.svg';
    }
  }
}
