import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toolIconOutline'
})
export class ToolIconOutlinePipe implements PipeTransform {

  transform(tool: string): string {
    switch (tool) {
      case 'Gửi duyệt':
        return 'iconSendOutline.svg';
      case 'Phê duyệt':
        return 'iconTickOutline.svg';
      case 'Ngưng hiển thị':
        return 'iconBanOutline.svg';
      case 'Trả về':
        return 'iconReturnOutline.svg';
      case 'Xóa câu hỏi':
        return 'iconTrashOutline.svg';
      default:
        return 'iconTickOutline.svg';
    }
  }
}
