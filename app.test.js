const ax = require('axios')

describe('mean', function(){
    test('throws error', async function(){
        await expect(ax.get('http://127.0.0.1:3000/mean')).rejects.toThrow(ax.AxiosError);
    });
    test('throws invalid nums error', async function(){
        await expect(ax.get('http://127.0.0.1:3000/mean?nums=sdfdsfdsfsdfdsfgd')).rejects.toThrow(ax.AxiosError);
    });
    test('gets mean of even-length array', async function(){
        let c = await ax.get('http://127.0.0.1:3000/mean?nums=1,2,3,4')
        expect(c.data['value']).toBe(2.5)
    });
    test('gets mean of odd-length array', async function(){
        let c = await ax.get('http://127.0.0.1:3000/mean?nums=1,2,3')
        expect(c.data['value']).toBe(2)
    });
});

describe('median', function(){
    test('throws error', async function(){
        await expect(ax.get('http://127.0.0.1:3000/median')).rejects.toThrow(ax.AxiosError);
    });
    test('throws invalid nums error', async function(){
        await expect(ax.get('http://127.0.0.1:3000/median?nums=sdfdsfdsfsdfdsfgd')).rejects.toThrow(ax.AxiosError);
    });
    test('gets median of even-length array', async function(){
        let c = await ax.get('http://127.0.0.1:3000/median?nums=1,2,3,4')
        expect(c.data['value']).toBe(2.5)
    });
    test('gets median of odd-length array', async function(){
        let c = await ax.get('http://127.0.0.1:3000/median?nums=1,2,3')
        expect(c.data['value']).toBe(2)
    });

})
describe('mode', function(){
    test('throws error', async function(){
        await expect(ax.get('http://127.0.0.1:3000/mode')).rejects.toThrow(ax.AxiosError);
    });
    test('throws invalid nums error', async function(){
        await expect(ax.get('http://127.0.0.1:3000/mode?nums=sdfdsfdsfsdfdsfgd')).rejects.toThrow(ax.AxiosError);
    });
    test('gets mode of array', async function(){
        let c = await ax.get('http://127.0.0.1:3000/mode?nums=1,2,2,3,4')
        expect(c.data['value']).toBe(2)
    });
})