export class UsersService {
    static getUserInfo() {
        let typeStr = this.getUserType();
        let name = this.getUserFirstName();
        return name + ' (' + typeStr + ')';
    }
    static getUserFirstName() {
        return(localStorage.getItem('user_first_name'));
    }
    static getUserType() {
        let type = localStorage.getItem('user_type');
        let typeStr = '';
        switch (type) {
            case '0':
                // Продавец
                typeStr = 'Менеджер';
                break;
            case '1':
                // Менеджер (Точка продажи)
                typeStr = 'Менеджер';
                break;
            case '2':
                // Менеджер (Главный склад)
                typeStr = 'Старший менеджер';
                break;
            case '3':
                // Менеджер (Старший)
                typeStr = 'Руководитель';
                break;
            case '4':
                // Администратор
                typeStr = 'Администратор';
                break;
            case '5':
                // Интерент магазин
                typeStr = 'Системный аккаунт';
                break;
            case '6':
                // CRM
                typeStr = 'Системный аккаунт';
                break;
            default:
                typeStr = 'Системный аккаунт';
        }
        return typeStr;
    }
    static standardPermission() {
        let type = localStorage.getItem('user_type');
        return (type === '0')||(type === '1')||(type === '2')||(type === '3')||(type === '4');
    }
    static managerPermission() {
        let type = localStorage.getItem('user_type');
        return (type === '1')||(type === '2')||(type === '3')||(type === '4');
    }
    static mainManagerPermission() {
        let type = localStorage.getItem('user_type');
        return (type === '3')||(type === '4');
    }
    static adminPermission() {
        let type = localStorage.getItem('user_type');
        return type === '4';
    }
}