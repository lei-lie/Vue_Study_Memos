/**
 * @description 向下查找组件直到找到对应的组件，则停止查找，然后向目标组件广播事件
 * @author xialei
 * @date 07/02/2021
 * @param {String} componentName 目标组件名
 * @param {String} eventName 事件名称
 * @param {String} params 事件参数
 */
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}

export default {
    methods: {
        // 向上查找组件直到找到目标组件，则停止查找，并且派发事件到目标组件
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
}