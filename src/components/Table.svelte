<script lang="ts">
    type Row = {
        title: string;
        value: number;
        type: 'deposit' | 'withdraw';
        category: string;
        date: Date;
    };

    let rows: Row[] = [
        {
            title: "Salary",
            value: 5000,
            type: "deposit",
            category: "Job",
            date: new Date("2020-01-01"),
        },
        {
            title: "Freelancing",
            value: 2000,
            type: "deposit",
            category: "Freelance",
            date: new Date("2020-01-02"),
        },
        {
            title: "New TV",
            value: 700,
            type: "withdraw",
            category: "Shopping",
            date: new Date("2020-01-03"),
        },
        {
            title: "New Desk (Wooden)",
            value: 150,
            type: "withdraw",
            category: "Shopping",
            date: new Date("2020-01-05"),
        },
        {
            title: "New Desk (Metal)",
            value: 250,
            type: "withdraw",
            category: "Shopping",
            date: new Date("2020-01-05"),
        },
        {
            title: "New Desk (Plastic)",
            value: 50,
            type: "withdraw",
            category: "Shopping",
            date: new Date("2020-01-05"),
        },
        {
            title: "New Desk (Glass)",
            value: 350,
            type: "withdraw",
            category: "Shopping",
            date: new Date("2020-01-05"),
        },
        {
            title: "New Desk (Plastic)",
            value: 50,
            type: "withdraw",
            category: "Shopping",
            date: new Date("2020-01-05"),
        }
    ]
</script>

<table>
    <tbody>
        {#each rows as row}
            <tr>
                <td>{row.title}</td>
                <td>{row.value}</td>
                <td>{row.category}</td>
                <td>{row.date.toDateString()}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-spacing: 0 0.5rem;
        padding: 0 10rem;
    }

    table td {
        padding: 1rem 2rem;
        border: 0;
        background: var(--gray900);
        color: var(--gray200);
    }

    table td:first-child {
        border-radius: 0.25rem 0 0 0.25rem;
    }

    table td:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
    }
</style>